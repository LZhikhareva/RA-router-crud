import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost({ posts, fetchNewValue }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const post = posts.find(p => p.id === parseInt(id, 10));
    const [newValue, setNewValue] = useState(post ? post.content : '');

    if (!post) {
        return <div>Такого поста нет</div>;
    }

    function close(e) {
        e.preventDefault();
        navigate(`/posts/${post.id}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            id: post.id,
            content: newValue,
            created: post.created
        };
        await fetchNewValue(post.id, postData);
        navigate('/');
    };

    return (
        <form className='edit-form' onSubmit={handleSubmit}>
            <div>Редактировать</div>
            <span className='edit_close' onClick={close}>&#x2717;</span>
            <textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
            />
            <button className='add_post' type="submit">Сохранить</button>
        </form>
    );
}