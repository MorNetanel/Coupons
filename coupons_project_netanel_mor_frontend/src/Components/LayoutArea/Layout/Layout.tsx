import { authStore } from "../../../Redux/AuthState";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import {useEffect, useState} from "react";
import Image from "BackImage.jpg";


function Layout(): JSX.Element {

    const [token, setToken] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setToken(authStore.getState().token);
        })
    }, []) 
    


    return (
        <div  className="Layout"  >
            
        
        
            <Logo/>
			<Header/>
            
            <Menu/>
            
            <main>
            <Routing/>
            </main>
            <Footer/>
            
        </div>
    );
}

export default Layout;
