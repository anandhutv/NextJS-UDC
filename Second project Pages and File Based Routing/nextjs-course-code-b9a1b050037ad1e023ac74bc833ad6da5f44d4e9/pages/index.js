import Link from 'next/link'
const HomePage = () => {
  return (
    <div>
        <h1>Hello Home Page</h1>
        <ul>
            <li>
                <Link href='/portfolio'>Portofolio</Link>
            </li>
            <li>
                <Link href='/clients'>Clients</Link>
            </li>
        </ul>
    </div>
  )
}

export default HomePage