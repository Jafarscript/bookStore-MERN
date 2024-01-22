import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox} from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BookCard from "../components/home/BookCard";

const Home = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState('table')

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShow('table')}>Table</button>
        <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShow('card')}>Card</button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-2">
          <Spinner />
        </div>
      ) : show === 'table' ? <BooksTable book={book} /> : <BookCard book={book} />
      }
    </div>
  );
};

export default Home;
