import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import useFetch from './useFetch'

const Update = () => {
    const { id } = useParams();

    const {data: blog, isPending, error, setIsPending} = useFetch('http://localhost:8000/blogs/' + id)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(!isPending && !error){
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
        }
    }, [blog])

    

    const handleUpdate = (e) => {
        e.preventDefault();
        const blog = { title, body, author, id };

        setIsPending(true);

        

            fetch('http://localhost:8000/blogs/' + id,{
                method: 'PUT',
                headers: { "Content-Type": "application/json; charset=UTF-8"},
                body: JSON.stringify(blog)
            })
            .then(() => {
                console.log('Done');
                setIsPending(false);
                history.push('/');
            })

        
    }

    return ( 
        <div className="create">
            { isPending && <div>Loading...</div>}
            { error && <div> 
                {error}
                <br></br>
                <Link to="/">Back to homepage...</Link>
                </div> }
            { blog && (
                <article>
                    <h2>Update Blog</h2>
                    <form 
                        onSubmit={handleUpdate}
                    >
                        <label htmlFor="">Blog title</label>
                        <input 
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label htmlFor="">Blog Body</label>
                        <textarea 
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>

                        <label htmlFor="">Blog author</label>
                        <select 
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        >
                            <option value="mario">mario</option>
                            <option value="yoshi">yoshi</option>
                        </select>

                        { !isPending && <button>Update Blog</button> }
                        { isPending && <button disabled>Updating blog...</button> }

                        
                    </form>
                </article>
            ) }
        </div>
    );
}

export default Update;