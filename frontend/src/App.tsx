import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.route';
import Layout from './routes/layout/layout.route';
import BookItem from './components/book-item/book-item.component';
import AddAndEditBookForm from './components/add-and-edit-book-form/add-and-edit-book-form.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='book/:id' element={<BookItem />} />
        <Route path='book/add' element={<AddAndEditBookForm />} />
        <Route path='book/edit/:id' element={<AddAndEditBookForm />} />
      </Route>
    </Routes>
  );
}

export default App;
