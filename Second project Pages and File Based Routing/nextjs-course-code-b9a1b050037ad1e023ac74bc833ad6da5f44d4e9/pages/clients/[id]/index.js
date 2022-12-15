import { useRouter } from "next/router"

const ClientProjectPage = () => {
    const router = useRouter()
    function loadProjectHandler(){
        // router.push('/clients/max/projectA')
        router.push({
            pathname: '/clients/[id]/[clientprojectid]',
            query: {id:'max',clientprojectid: 'projecta'}
        });
    }
  return (
    <div>
        <h1>The Projects of a Given Client</h1>
        <button onClick={loadProjectHandler}>load Project A</button>
    </div>
  )
}

export default ClientProjectPage