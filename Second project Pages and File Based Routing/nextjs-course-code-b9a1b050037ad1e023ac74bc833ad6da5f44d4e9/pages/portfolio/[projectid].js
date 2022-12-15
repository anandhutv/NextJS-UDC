import {useRouter} from 'next/router'

const PortfolioProjectPage = () => {
    const router = useRouter()
    console.log(router.pathname)
    console.log(router.query)
    //send a request to some backend server
    //to fetch the piece of data with an id of router.query.projectid
  return (
    <div>
        <h2>Hello I'm a Portfolio project page with different particular id</h2>
    </div>
  )
}

export default PortfolioProjectPage