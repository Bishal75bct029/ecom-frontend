import { createBrowserRouter } from 'react-router-dom';
import { publicRouter } from './publicRouter';
import { privateRouter } from './privateRouter';

export default createBrowserRouter([...privateRouter, ...publicRouter], {});
