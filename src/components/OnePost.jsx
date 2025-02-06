import { NavLink, useNavigate, useParams } from 'react-router-dom';

export default function OnePost({ posts, convertDate, fetchDeletePost }) {

    const navigate = useNavigate();
    const { id } = useParams();
    const post = posts.find(p => p.id === parseInt(id, 10));
    if (!post) {
        return <div>Такого поста нет</div>;
    }

    function deletePost(id) {
        console.log('удаляемся', id);
        fetchDeletePost(id);
        navigate('/');
    }


    return (
        <div className='post-item' key={post.id}>
            <div className="header">
                <img className="img" src="" alt="" />
                <div className="info">
                    <div className='author'>Ivan</div>
                    <div className="time">{convertDate(post.created)}</div>
                </div>
            </div>
            <div className="text">{post.content}</div>
            <div className='actions'>
                <NavLink to={`/posts/${post.id}/edit`} className='actions-btn edit'>Изменить</NavLink>
                <button className='actions-btn delete' onClick={() => deletePost(post.id)}>Удалить</button>
            </div>
        </div>
    )
}