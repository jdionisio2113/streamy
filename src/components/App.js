import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import StreamList from './streams/StreamList'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamShow from './streams/StreamShow'
import Header from './Header'

// const PageOne = () => {
//     return (
//         <div>
//             PageOne
//             <Link to="/pagetwo">Navigate to page two</Link>
//         </div>
//     )
// }

// const PageTwo = () => {
//     return (
//         <div>
//             PageTwo
//             <Link to="/">Navigate to page one</Link>
//         </div>
//     )
// }


const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <div>
                    <Header />
                    {/* <Route path="/" exact component={PageOne} />
                    <Route path="/pagetwo" component={PageTwo} /> */}
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams-new" exact component={StreamCreate} />
                    <Route path="/streams-edit" exact component={StreamEdit} />
                    <Route path="/streams-delete" exact component={StreamDelete} />
                    <Route path="/streams-show" exact component={StreamShow} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;