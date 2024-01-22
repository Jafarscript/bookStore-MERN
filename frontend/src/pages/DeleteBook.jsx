import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        alert('An error happened. Please check the console.');
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-2">
          <Spinner />
        </div>
      ) : null}
      {book && (
        <div className="border-2 border-sky-400 rounded-xl p-4">
          <p>
            Are you sure you want to delete the book <strong>{book.title}</strong> by {book.author}?
          </p>
          <div className="flex mt-4">
            <button className="p-2 bg-red-600 text-white" onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteBook