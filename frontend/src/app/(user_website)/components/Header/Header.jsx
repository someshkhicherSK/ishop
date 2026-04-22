
import Nav from './Nav'
import Search from './Search'
import PathName from './PathName'


function Header() {
  

  return (
    <header>
        {/* <div className="container mx-auto"> */}
            <Nav/>
            <Search/>
            <PathName/>
            {/* </div> */}
    </header>
  )
}

export default Header