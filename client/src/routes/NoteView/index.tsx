import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Input, Layout, Typography, Space } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { grey, red } from '@ant-design/colors';
import { useParams } from 'react-router-dom';
import { fetchRequest } from '../../utils/fetchUtil';
import Note from '../../types/Note';
import style from './style.module.css';
import strings from './strings';

type NoteViewProps = {
	edit?: boolean
};

type NoteViewRouteParams = {
	noteId?: string
};

const NoteView = ({ edit }: NoteViewProps): React.ReactElement => {
	const { noteId }: NoteViewRouteParams = useParams<NoteViewRouteParams>();
	const [note, setNote] = useState<Note>({ contactName: '', noteText: '' });
	const navigate = useNavigate();

	useEffect(() => {
		if (noteId) {
		fetchRequest({ endpoint: `/notes/${noteId}` })
			.then(({ data, ok }) => {
				if (ok) {
					setNote(data.note)
				}
			});
		}
	}, []);

	const createOrUpdateNote = useCallback(note => {
		fetchRequest({
			endpoint: '/notes',
			method: 'POST',
			body: note
		}).then(({ data, ok }) => {
			if (ok) {
				const { note } = data;
				setNote(note)
				navigate(`/note/${note.id}`)
			}
		});
	}, []);

	const deleteNote = useCallback(note => {
		fetchRequest({
			endpoint: '/notes',
			method: 'DELETE',
			body: note
		}).then(({ data, ok }) => {
			if (ok) {
				navigate(`/`)
			}
		});
	}, []);

	return (
		<Layout>
			<Layout.Header className={style.header} style={{ backgroundColor: grey.primary }}>
				<Typography.Title level={2}>{strings.title}</Typography.Title>
				<Link to="/">
					<Typography.Text><ArrowLeftOutlined /> {strings.allNotesLink}</Typography.Text>
				</Link>
			</Layout.Header>

			<Layout.Content	className={style.content}>
				{
					edit ?
					<Input
						value={note.contactName}
						placeholder={strings.namePlaceholder}
						maxLength={100}
						className={style.formItem}
						onChange={({target: { value: contactName }}) => setNote({ ...note, contactName })}
					/> :
					<Typography.Text className={style.textDisplay}>{note.contactName}</Typography.Text>
				}

				{
					edit ?
					<Input.TextArea
						value={note.noteText}
						placeholder={strings.textPlaceholder}
						maxLength={2000}
						className={style.formItem}
						onChange={({target: { value: noteText }}) => setNote({ ...note, noteText })}
					/> :
					<Typography.Paragraph className={style.textDisplay}>{note.noteText}</Typography.Paragraph>
				}

				<div className={`${style.formActionRow} ${style.formItem}`}>
					{
						edit ?
						<Button disabled={!note.contactName || !note.noteText} onClick={() => createOrUpdateNote(note)}>{strings.buttonSaveText}</Button> :
						<Link to={`/note/${note.id}/edit`}>
							<Button disabled={!note.contactName || !note.noteText}>{strings.buttonEditText}</Button>
						</Link>
					}

					{
						noteId &&
						<Button style={{ color: red.primary }} onClick={() => deleteNote(note)} >
							<DeleteOutlined/> Delete
						</Button>
					}
				</div>
			</Layout.Content>
		</Layout>
	);
};

export default NoteView;
