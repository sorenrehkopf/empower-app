import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Layout, List, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';
import { grey, green, red } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import { fetchRequest } from '../../utils/fetchUtil';
import Note from '../../types/Note';
import consts from './consts';
import strings from './strings';
import style from './style.module.css';

const { ListTextTruncLength } = consts;

const NotesList = (): React.ReactElement => {
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		fetchRequest({ endpoint: '/notes' })
			.then(({ data, ok }) => {
				if (ok) {
					setNotes(data.notes)
				}
			});
	}, []);

	const deleteNote = useCallback(id => {
		fetchRequest({
			endpoint: '/notes',
			method: 'DELETE',
			body: { id }
		}).then(({ data, ok }) => {
			if (ok) {
				setNotes(notes.filter(({ id: noteId }) => noteId != id))
			}
		});
	}, [notes]);

	return (
		<Layout>
			<Layout.Header className={style.header} style={{ backgroundColor: grey.primary }}>
				<Typography.Title level={2}>{strings.title}</Typography.Title>
				<Link to="/note/new"><Button>{strings.buttonText}</Button></Link>
			</Layout.Header>

			<Layout.Content	className={style.content}>
				<List
					itemLayout="horizontal"
					dataSource={notes}
					renderItem={({ id, contactName, noteText }: Note) => (
						<List.Item
							className={style.noteItem}
							key={id}
							actions={[
								<Link to={`/note/${id}`}><ReadOutlined style={{ color: green.primary }} className={style.actionIcon} /></Link>,
								<Link to={`/note/${id}/edit`}><EditOutlined className={style.actionIcon} /></Link>,
								<DeleteOutlined onClick={() => deleteNote(id)} style={{ color: red.primary }} className={style.actionIcon} />
							]}
						>
							<List.Item.Meta
								avatar={<Avatar>{contactName[0]}</Avatar>}
								title={contactName}
								description={`${noteText.slice(0, ListTextTruncLength)}${noteText.length > ListTextTruncLength ? '...' : ''}`}
							/>
						</List.Item>
					)}
				/>
			</Layout.Content>
		</Layout>
	);
};

export default NotesList;
