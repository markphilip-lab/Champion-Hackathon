import { Head } from '@inertiajs/react'
import { ActivityIcon, ChartLine, CheckSquare, CircleCheckBig, DoorOpen, Flag, Handshake, House, Monitor, Send, SquareText, Trash, TriangleAlert, User } from 'lucide-react';
import React, { Activity, useEffect, useState } from 'react'

export default function Issuespage() {
   const emptyForm = {
    lab_number: '',
    equipment_type: '',
    issue_description: '',
    reported_by: '',
    severity: ''
   };

   const badge ={
    High: 'bg-red-500 px-6',
    Medium: 'bg-orange-500 px-3',
    Low: 'bg-gray-500 px-6'
   };

    const [formData, setFormData] = useState(emptyForm);
    const [issues, setIssues] = useState([]);

    //asynchronous function to handle adding product input changes
    const handleChange = (e) => {
       setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //asynchronous function to handle adding a new product
    const handleSubmit = async (e) => 
        
        {e.preventDefault();
            const response = await fetch('/api/equipment_issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        
            setFormData(emptyForm);
            fetchIssues();
    
    };

    //asynchronous function to fetch all products
    const fetchIssues = async () => {
            const response = await fetch('/api/equipment_issues');
       
            const data = await response.json();
            //set the products state
            setIssues(data);
     
    };

    //fetch products when the component mounts
    useEffect(() => {
        //fetch products when the component mounts
        fetchIssues();
    }, []);

    //asynchronous function to handle deleting a product
    const handleResolve = async (id) => {
    
            const response = await fetch(`/api/equipment_issues/${id}`, {
                method: 'DELETE'
            });

            fetchIssues();
   
    };

    return (
        <div>
            <Head title="Dashboard" />

            <header className='bg-gray-900 top-0 z-20 sticky flex justify-between items-center px-6 py-2 text-white'>
                <div className='gap-3 flex'>
                    
                    <a href="#hero" className='font-bold text-lg'><House className='inline-block mr-2 mb-1' />IT SUPPORT DESK</a>
                    <span className='text-sm bg-white text-gray-900 font-bold rounded-full px-3 py-1'>BSIT 1-E</span>
                    
                </div>
                <nav className='flex gap-3'>
                    <a href="#report" className="rounded-md hover:text-gray-300 p-2">Report an Issue</a>
                    <a href="#issues" className="rounded-md hover:text-gray-300 p-2">View Issues</a>
                    <a href="#footer" className="rounded-md hover:text-gray-300 p-2">Guidelines</a>
                    <span className='rounded-full bg-red-500 text-white font-bold p-2'>{issues.length} Open</span>
                </nav>
            </header>

            <section className='min-h-screen bg-gradient-to-br from-blue-700 to-indigo-700 px-6 py-12'>
                <div className='max-w-6xl mt-8 mx-auto gap-28 grid lg:grid-cols-2'>
                    <div className='text-white w-full ml-8 '>
                        <span className='inline-block text-white bg-white/10 rounded-full px-3 py-2 scroll-mt-36' id='hero'>Computer Lab Support <Handshake className='inline-block ' /></span><br />
                        <h1 className='inline-block text-6xl font-extrabold mt-6'>Computer Lab Diagnostic & Fault Tracking Desk</h1>
                        <p className='text-lg mt-4 mb-6'>You Report them, we Try and Fix them!</p>

                        <div className='flex gap-3'>
                            <a href="#report" className="rounded-xl  bg-white font-bold text-lg text-blue-500 mt-5 p-5 px-8 shadow-lg">Report an Issue</a>
                            <a href="#issues" className="rounded-xl border mt-5 p-5 shadow-lg text-lg">View Open Issues</a>
                        </div>
                    </div>

                 <div className='bg-gradient-to-br from-white/5 to-white/10 shadow-xl rounded-2xl p-8 pt-16 mr-8 pl-16 text-white'>
                    <div>
                        <h1 className='text-2xl uppercase font-semibold mb-4'>Live status <ActivityIcon className='inline-block ml-2 mb-1' /></h1>   
                    <span className='text-8xl font-extrabold mt-9'>{issues.length}</span>
                    <h1 className='mt-6'>Open Issues right now</h1>
                    </div>
                    

                    <div className='mt-8 flex gap-2'>
                        <span className='rounded-full bg-red-500 px-3 py-2 w-20 text-center font-bold shadow-lg'>High</span>
                        <span className='rounded-full bg-orange-500 px-3 py-2 w-20 text-center shadow-lg'>Medium</span>
                        <span className='rounded-full bg-gray-500 px-3 py-2 w-20 text-center shadow-lg'>Low</span>
                    </div>

                 </div>

                    


                    
                </div>
            </section>

            <section className='min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-white   p-8 scroll-mt-12' id='report'>
                        <div className='mx-auto max-w-6xl lg:grid-cols-2 grid p-6'>
                            <div>
                                <h1 className='mt-20 font-bold text-4xl'>Report an Issue <Flag className='inline-block mb-1' /></h1>
                                <p className='text-lg text-gray-500'>Report issues immediately so IT staff can fix them quickly!</p>

                                <div className='flex gap-4 mt-8'>
                                  <span className='bg-blue-500 px-3 py-1 rounded-full text-white'>1</span>
                                  <span className='mt-1'>Pick the Lab and the faulty device</span>
                                </div>
                                <div className='flex gap-4 mt-5'>
                                  <span className='bg-blue-500 px-3 py-1 rounded-full text-white'>2</span>
                                  <span className='mt-1'>Describe the issue</span>
                                </div>
                                <div className='flex gap-4 mt-5'>
                                  <span className='bg-blue-500 px-3 py-1 rounded-full font-bold text-white'>3</span>
                                  <span className='mt-1'>Choose how urgent it is</span>
                                </div>
                            </div>

                            <div className='gap-12 bg-white shadow-2xl mt-3 p-8 pb-8 rounded-xl'>
                                 <form onSubmit={handleSubmit} className=' bg-white mt-8 grid grid-cols-2 w-full gap-4'>
                                <label className='text-md'>Laboratory
                                    <select name="lab_number" value={formData.lab_number} onChange={handleChange} className='flex mt-1 w-full rounded-xl p-2' required>
                                    <option value="">Select a Laboratory</option>
                                    <option>Lab A</option>
                                    <option>Lab B</option>
                                    <option>Lab C</option>
                                    <option>Mac Lab</option>
                                </select>
                                </label>
                                <label className='text-md'>Equipment
                                    <select name="equipment_type" value={formData.equipment_type} onChange={handleChange} className='flex w-full mt-1 rounded-xl p-2' required>
                                    <option value="">Type of Equipment</option>
                                    <option>Monitor</option>
                                    <option>Mouse</option>
                                    <option>Keyboard</option>
                                    <option>LAN Cable</option>
                                </select>
                                </label>

                                <label className='text-md col-span-2'>Description
                                    <textarea name="issue_description" value={formData.issue_description} onChange={handleChange} placeholder='Describe the issue' className='rounded-xl mt-1 w-full p-2' required/>
                                </label>

                                <label className='text-md'>Reported By
                                    <input type="text" name="reported_by" value={formData.reported_by} onChange={handleChange} placeholder='Student Name/ID' className='rounded-xl w-full mt-1 p-2'/>
                                </label>
                                
                                <label className='text-md'>Severity
                                    <select name="severity" value={formData.severity} onChange={handleChange} className='flex w-full mt-1 rounded-xl p-2' required>
                                    <option value="">Severity</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                                </label>
                                
                                <button type="submit" className='w-full mb-8 mt-5 bg-blue-500 col-span-full text-white font-bold hover:bg-blue-600 rounded-xl p-3'>Submit</button>

                            </form>
                            </div>
                        </div>
                    </section>

                    <section className='min-h-screen bg-white scroll-mt-16 mt-10' id='issues'>
                        <div className='mx-auto max-w-6xl'>
                            <div>
                                <h1 className='text-4xl font-extrabold'>Ongoing Issues</h1>
                            </div>

                            <div className='overflow-hidden rounded-xl mt-4 shadow-2xl'>
                                <table className='w-full text-left shadow-xl' >
                                    <thead className=' bg-gray-900 text-white'>
                                        <tr>
                                            <th className='p-3'>Laboratory <DoorOpen className='inline-block ml-2 mb-1' /></th>
                                            <th className='p-3'>Equipment <Monitor className='inline-block ml-2 mb-1' /></th>
                                            <th className='p-3'>Description <SquareText className='inline-block ml-2 mb-1' /></th>
                                            <th className='p-3'>Reported By <User className='inline-block ml-2 mb-1' /></th>
                                            <th className='p-3'>Severity <TriangleAlert className='inline-block ml-2 mb-1' /></th>
                                            <th className='p-3'>Action <CheckSquare className='inline-block ml-2 mb-1' /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!issues.length && (
                                            <tr>
                                                <td colSpan={6} className='text-center p-6 py-12 text-gray-500'>No issues reported yet. Everything is working!</td>
                                            </tr>
                                        )}
                                        {issues.map((issue) => (
                                        <tr key={issue.id}>
                                            <td className="border border-gray-200 px-4 py-2">{issue.lab_number}</td>
                                            <td className="border border-gray-200 px-4 py-2">{issue.equipment_type}</td>
                                            <td className="border border-gray-200 px-4 py-2">{issue.issue_description}</td>
                                            <td className="border border-gray-200 px-4 py-2">{issue.reported_by}</td>
                                            <td className="border border-gray-200 px-4 py-2 text-center">
                                                <span className={`${badge[issue.severity]}  px-3 py-1 text-white rounded-xl text-sm font-bold`}>{issue.severity}</span>
                                             </td>

                                            
                                            <td className="border border-gray-200 px-4 py-2 gap-3">
                                                <button className=" text-green-500 px-2 py-1 rounded" onClick={() => handleResolve(issue.id)}>
                                                    Resolve <CircleCheckBig className='inline-block ml-2 mb-1' />
                                                </button>
                                                <button className=" text-red-500 px-2 py-1 rounded" onClick={() => handleResolve(issue.id)}>
                                                    Delete <Trash className='inline-block ml-2 mb-1' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                <footer className='bg-gray-900 text-white pt-12 mt-16' id='footer'>
                <div className='mx-auto max-w-6xl md:grid-cols-3 grid gap-8 '>
                    <div>
                        <h1 className='font-bold'>Lab Guidelines</h1>
                        <p className='text-gray-400 mt-3'>Report damaged equipment as soon as you notice it. Do not unplug or move devices yourself.</p>
                    </div>
                    <div className='ms-16'>
                        <h1 className='font-bold'>IT Custodian Office Hours</h1>
                        <p className='text-gray-400 mt-3 w-full'>Monday to Friday, 8:00AM to 5:00PM</p>
                    </div>
                    <div className='ms-16'>
                        <h1 className='font-bold'>Team</h1>
                        <p className='text-gray-400 mt-1'>Chiong, Mark Philip</p>
                        <p className='text-gray-400 mt-1'>Mercado, Yanche Cyryll</p>
                        <p className='text-gray-400 mt-1'>Gubalane, Rence</p>
                        <p className='text-gray-400 mt-1'>Magbulogtong, Crist Ethan</p>
                    </div>
                </div>
                <div className='pt-3'>
                    <hr className='col-span-full mt-4'></hr>
                    <p className='text-gray-400 text-center flex justify-center align-middle p-4' >IT Support Desk | hEckers</p>
                </div>

                    
                </footer>





        </div>
    )
}
