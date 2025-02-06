import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

export default function NewPost({ fetchNewPost }) {
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState('');


    function addPost(e) {
        e.preventDefault();
        const postInfo = {
            'content': newPost,
            'created': Date.now()
        }
        fetchNewPost(postInfo);
        navigate('/');
    }

    function close(e) {
        e.preventDefault();
        navigate('/');
    }

    return (
        <form className='new-post-item' onSubmit={addPost}>
            <textarea
                placeholder='Введите текст поста'
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
            />
            <button type='submit' className='add_post'>Опубликовать</button>
            <span className='close' onClick={close}>&#x2717;</span>
        </form>
    )
}