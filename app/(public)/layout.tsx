import Footer from "@/components/shared/Footer";
import  Navbar from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";

const PublicGroupLayout = async ({children} : {children: React.ReactNode}
) => {
    const user = await getMe();
    console.log(user)
  return (
    <div>
      <Navbar user={user}/>
      {children}
      <Footer/>
    </div>
  )
}

export default PublicGroupLayout