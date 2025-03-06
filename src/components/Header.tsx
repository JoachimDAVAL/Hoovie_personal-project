import logo from '../assets/Logo components.svg'
import categoryIcon from '../assets/category.png'


export default function Header() {
  return (
    <header>
        <img src={categoryIcon}/>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Hoovie</h1>
        <input type='text' placeholder='Search...' />
    </header>
  )
}