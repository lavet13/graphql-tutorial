import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.route';
import Layout from './routes/layout/layout.route';
import BookItem from './components/book-item/book-item.component';
import EditBookForm from './components/edit-book-form/edit-book-form.component';
import AddBookForm from './components/add-book-form/add-book-form.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='book/:id' element={<BookItem />} />
        <Route path='book/add' element={<AddBookForm />} />
        <Route path='book/edit/:id' element={<EditBookForm />} />
      </Route>
    </Routes>
  );
}

export default App;
