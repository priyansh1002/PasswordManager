import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CopyIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        setPasswordArray(passwords)
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
        // let passwords = localStorage.getItem("passwords");
        // // let passwordArray;
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords))
        // }
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
    }

    const showPassward = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text"
        }
    }

    // const savePassword = async () => {
    //     if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
           
           
    //         //if any such id exists in the db , delete it
    //         await fetch("http://localhost:3000/", { method: "DELETE", header: { "content-type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            
    //         setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    //         await fetch("http://localhost:3000/", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
    //         // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
    //         // console.log([...passwordArray, form])
    //         setForm({ site: "", username: "", password: "" })

    //         toast('Password Saved Successfully!', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //             // transition: Bounce,
    //         });
    //     } else {
    //         toast('Error:Password Not Saved', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //             // transition: Bounce,
    //         });
    //     }
    // }

    const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
        const newId = uuidv4();
        const newPassword = { ...form, id: newId };

        // If any such id exists in the db, delete it
        await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: form.id })
        });

        // Add new password to state and local storage
        const updatedPasswordArray = [...passwordArray, newPassword];
        setPasswordArray(updatedPasswordArray);
        await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassword)
        });

        // Reset the form
        setForm({ site: "", username: "", password: "" });

        toast('Password Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    } else {
        toast('Error: Password Not Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
};


    const deletePassword = async (id) => {
        // console.log("deleteing paswsord",id);
        let c = confirm("Do you really want to delete thid password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            let res = await fetch("http://localhost:3000/", { method: "DELETE", header: { "content-type": "application/json" }, body: JSON.stringify({ id }) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            // console.log([...passwordArray, form])
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
        }
    }

    const editPassword = (id) => {
        console.log("editing password", id);
        setForm({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
        // console.log([...passwordArray, form])

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition="Bounce"
            />


            <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="p-2 pt-3 md:mycontainer min-h-[81.3vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-blue-700'>&lt;</span>
                    Lock
                    <span className='text-blue-700'>Box/&gt;</span>
                </h1>
                <p className='text-blue-900 text-lg text-center'>Your Own Password Manager</p>
                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-blue-700 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-blue-700 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-blue-700 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassward}>
                                <img ref={ref} className='fill-current text-blue-600 p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-blue-600 hover:bg-blue-500  rounded-full px-6 py-2 w-fit border-blue-900 '><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                        SAVE PASSWORD
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='flex justify-center items-center font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='flex justify-center items-center'> No Passwords To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-blue-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-100'>
                            {passwordArray.map((item, index) => {

                                return <tr key={index}>
                                    <td className='py-2 border border-white  text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>

                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                {/* <lord-icon
                                                    style={{ width: "20px", height: "20px", paddingTop: "5px", paddingLeft: "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover">
                                                </lord-icon> */}
                                                <CopyIcon w={20} h={20} paddingTop={3} paddingLeft={3} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center border border-white py-2 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>

                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.userName) }}>
                                                {/* <lord-icon
                                                    style={{ width: "20px", height: "20px", paddingTop: "5px", paddingLeft: "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover">
                                                </lord-icon> */}
                                                <CopyIcon w={20} h={20} paddingTop={3} paddingLeft={3} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' border border-white py-2 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>

                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                {/* <lord-icon
                                                    style={{ width: "20px", height: "20px", paddingTop: "5px", paddingLeft: "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover">
                                                </lord-icon> */}
                                                <CopyIcon w={20} h={20} paddingTop={3} paddingLeft={3} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center border border-white py-2 text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/zfzufhzk.json"
                                                trigger="hover"
                                                style={{ width: "25px", height: "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/xekbkxul.json"
                                                trigger="hover"
                                                style={{ width: "25px", height: "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager 
