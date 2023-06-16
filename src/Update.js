import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch'

const Update = () => {
    const { id } = useParams();

    const {data: blog, isPending, error, setIsPending} = useFetch('http://localhost:8000/blogs/' + id)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(!isPending){
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
        }
    }, [isPending])

    

    const handleUpdate = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(

            fetch('http://localhost:8000/blogs',{
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(blog)
            })
            .then(() => {
                console.log('Done');
                setIsPending(false);
                history.push('/');
            })

        )
    }

    return ( 
        <div className="create">
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
        </div>
    );
}

export default Update;