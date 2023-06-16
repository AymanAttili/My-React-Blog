import { useParams, useHistory, Link } from 'react-router-dom'
import useFetch from './useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    const{data: blog, isPending, error} = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory();

    const handleClick = () =>{
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }



    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div>}
            { error && <div> 
                {error} 
                <br></br>
                <Link to="/">Back to homepage...</Link>
            </div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written By { blog.author }</p>
                    <div>{ blog.body }</div>

                    <div className="buttons">
                        <button onClick={handleClick}>delete</button>

                        <Link to={`/update/${blog.id}`}>
                            <button>Update</button>
                        </Link>
                    </div>

                </article>
                )
            }

        </div>
    );
}

export default BlogDetails;