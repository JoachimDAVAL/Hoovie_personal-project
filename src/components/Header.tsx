import logo from '../assets/Logo components.svg'
import categoryIcon from '../assets/category.png'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <div>
      <header className='place-self-center max-h-20 ml-200'>
        <Link to='/'>
          <div className='flex items-center mr-200 mt-10'>
            <img src={logo} className='max-h-20 mr-5' alt='logo' />
            <h1 className=' text-3xl'>Hoovie</h1>
          </div>
        </Link>
    </header>
    <div className='flex justify-between'>
      <img src={categoryIcon} alt='logo' className='max-w-15 max-h-10 ml-10 mb-5'/>
      <input type='text' placeholder='Search...' className='mr-80 rounded-xl border-solid shadow-xl max-h-10 min-w-80'/>
    </div>

    </div>
  )
}