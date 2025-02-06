import { NavLink } from 'react-router-dom';

export default function Posts(props) {
    return (
        <>
            <div className='add-click'>
                <NavLink to='/posts/new' className="add_post" activeClassName='app-post-active'>Создать пост</NavLink>
            </div>
            {props.posts.map(post => {
                return (
                    <div className='post-item' key={post.id}>
                        <div className="header">
                            <img className="img" src="" alt="" />
                            <div className="info">
                                <div className='author'>Ivan</div>
                                <div className="time">{props.convertDate(post.created)}</div>
                            </div>
                        </div>
                        <div className="text">{post.content}</div>
                        <NavLink to={`/posts/${post.id}`} className='additional'>Подробнее</NavLink>
                    </div>
                )
            })}
        </>

    )
}