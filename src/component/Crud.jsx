import React, { useState, useEffect } from 'react';
import firebaseConfigApp from '../lib/firebase.config';
import { getFirestore, addDoc, collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

const db = getFirestore(firebaseConfigApp);

const Crud = () => {
  const [inputValue, setInputValue] = useState({
    employee: '',
    salary: '',
    joiningDate: ''
  });
  const [employees, setEmployees] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const q = query(collection(db, 'employees'), orderBy('timestamp', 'asc'));
    const snapshot = await getDocs(q);
    const employeeData = snapshot.docs.map((doc, index) => ({ id: doc.id, serial: index + 1, ...doc.data() }));
    setEmployees(employeeData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editMode) {
      // Edit existing employee
      const docRef = doc(db, 'employees', editId);
      await updateDoc(docRef, inputValue);
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new employee
      const dataWithTimestamp = { ...inputValue, timestamp: new Date() };
      console.log('date', dataWithTimestamp)
      await addDoc(collection(db, 'employees'), dataWithTimestamp);
    }
    setInputValue({
      employee: '',
      salary: '',
      joiningDate: ''
    });
    await fetchData();
  };

  const handleEdit = (employee) => {
    setInputValue({
      employee: employee.employee,
      salary: employee.salary,
      joiningDate: employee.joiningDate
    });
    setEditMode(true);
    setEditId(employee.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'employees', id));
    fetchData();
  };

  return (
    <div className="bg-zinc-600 text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:w-10/12 md:w-10/12">
        <div className="text-center py-5 bg-white">
          <h1 className="text-4xl text-zinc-700 font-bold uppercase">CRUD Application</h1>
        </div>

        <div className="grid p-4 shadow-lg bg-zinc-700 rounded-lg text-black mx-auto lg:w-8/12 md:w-10/12 mt-4">
          <div className="backdrop-blur-md bg-zinc-500/30 p-4 rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 flex-col items-start">
                <div className="flex flex-col w-full">
                  <label className="text-white" htmlFor="employee">Employee Name </label>
                  <input onChange={handleChange} value={inputValue.employee} type="text" name="employee" className="form-input rounded-md mt-2" placeholder="Enter the Employee Name..." />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-white" htmlFor="salary">Salary </label>
                  <input onChange={handleChange} value={inputValue.salary} type="text" name="salary" className="form-input rounded-md mt-2" placeholder="Enter the Employee Salary..." />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-white" htmlFor="joiningDate">Employee Joining Date </label>
                  <input onChange={handleChange} value={inputValue.joiningDate} type="date" name="joiningDate" className="form-input rounded-md mt-2" />
                </div>
                <div>
                  <button className="bg-green-500 p-2 rounded-md text-white font-semibold uppercase">{editMode ? 'Update' : 'Submit'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="grid p-4 shadow-lg bg-zinc-700 rounded-lg text-black mx-auto lg:w-8/12 md:w-10/12 mt-5">
          <div className="backdrop-blur-md bg-zinc-500/30 p-4 rounded-lg text-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-600">
                  <tr>
                    <th className="p-2 border-b">S. No</th>
                    <th className="p-2 border-b">Employee Name</th>
                    <th className="p-2 border-b">Salary</th>
                    <th className="p-2 border-b">Joining Date</th>
                    <th className="p-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-2 border-b text-center">No employees found</td>
                    </tr>
                  ) : (
                    employees.map((employee, index) => (
                      <tr key={employee.id} className="hover:bg-zinc-700">
                        <td className="p-2 border-b">{index + 1}</td>
                        <td className="p-2 border-b">{employee.employee}</td>
                        <td className="p-2 border-b">{employee.salary}</td>
                        <td className="p-2 border-b">{employee.joiningDate}</td>
                        <td className="p-2 border-b">
                          <button className='bg-green-500 px-3 rounded-md mr-2' onClick={() => handleEdit(employee)}>Edit</button>
                          <button className='bg-sky-500 px-3 rounded-md' onClick={() => handleDelete(employee.id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crud;



// import React, { useState, useEffect } from 'react';
// import firebaseConfigApp from '../lib/firebase.config';
// import { getFirestore, addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// const db = getFirestore(firebaseConfigApp);

// const Crud = () => {
//   const model = {
//     employeeName: '',
//     salary: '',
//     joiningDate: ''
//   }
//   const [employees, setEmployees] = useState(model)
//   const [isEmpty, setIsEmpty] = useState(false)
//   const [isUpdated, setIsUpdated] = useState(false)
//   const [employeeData, setEmployeeData] = useState([])
//   const [edit, setEdit] = useState(null)

//   useEffect(()=>{
//     const req = async ()=>{
//       const snapshot = await getDocs(collection(db, "employees"))
//       setIsEmpty(snapshot.empty)
//       let tmp = []
//       snapshot.forEach((doc)=>{
//         const document = doc.data()
//         document.uid = doc.id
//         tmp.push(document)
//       })

//       setEmployeeData(tmp)
//     }

//     req()
//   }, [isEmpty, isUpdated])

//   const handleChange = (e)=>{
//     const input = e.target
//     const name = input.name
//     const value = input.value
//     setEmployees({
//       ...employees,
//       [name]: value
//     })
//   }

//   const createEmployee = async (e)=>{
//     try {
//       e.preventDefault()
//       await addDoc(collection(db, "employees"), employees)
//       setIsEmpty(false)
//       setIsUpdated(!isUpdated)
//       new Swal({
//         icon: 'success',
//         title: 'Employee Created !'
//       })
//     }
//     catch(err)
//     {
//       new Swal({
//         icon: 'error',
//         title: 'Failed !',
//         text: err.message
//       })
//     }
//     finally {
//       setEmployees(model)
//     }
//   }
//   const deleteEmployee = async (id)=>{
//     const ref = doc(db, "employees", id)
//     await deleteDoc(ref)
//     setIsUpdated(!isUpdated)
//   }

//   const editEmployee = (item)=>{
//     console.log(item)
//     setEdit(item)
//     setEmployees(item)
//   }

//   const saveEmployee = async (e)=>{
//     e.preventDefault()
//     const ref = doc(db, "employees", edit.uid)
//     await updateDoc(ref, employees)
//     setIsUpdated(!isUpdated)
//     setEdit(null)
//     setEmployees(model)
//   }

//   return (
//     <div className="flex flex-col items-center gap-16">
//     <h1 className="text-5xl font-bold">CodingOtt <span className="text-indigo-600">CRUD</span></h1>
//     <div className="flex w-11/12 gap-16">
//       <div className='w-[400px]'>
//         <form className="space-y-6" onSubmit={edit ? saveEmployee : createEmployee}>
//           <div className="flex flex-col">
//             <label className="font-semibold text-lg mb-2">Employee Name</label>
//             <input 
//               onChange={handleChange}
//               required
//               name="employeeName"
//               className="p-3 rounded border border-gray-300"
//               placeholder="Employee name"
//               value={employees.employeeName}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-lg mb-2">Salary</label>
//             <input 
//               onChange={handleChange}
//               type="number"
//               required
//               name="salary"
//               className="p-3 rounded border border-gray-300"
//               placeholder="Salary"
//               value={employees.salary}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="font-semibold text-lg mb-2">Joining Date</label>
//             <input 
//               onChange={handleChange}
//               type="date"
//               required
//               name="joiningDate"
//               className="p-3 rounded border border-gray-300"
//               value={employees.joiningDate}
//             />
//           </div>
//           {
//             edit ? 
//             <button className="bg-rose-500 px-6 py-3 rounded font-semibold text-white">SAVE</button>
//             :
//             <button className="bg-green-500 px-6 py-3 rounded font-semibold text-white">CREATE</button>
//           }
//         </form>
//       </div>
//       <div className='flex-1'>
//         {
//           isEmpty && 
//           <div className='flex flex-col items-center'>
//             <i className="ri-u-disk-line text-3xl text-gray-500"></i>
//             <h1 className='text-3xl text-gray-500'>Empty</h1>
//           </div>
//         }
//         <h1 className='text-2xl font-semibold'>Employees</h1>
//         <table className='w-full mt-8'>
//           <thead>
//             <tr className="bg-rose-600 text-white text-left">
//               <th className='py-2 pl-2'>S/No</th>
//               <th>Employee Name</th>
//               <th>Salary</th>
//               <th>Joining Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               employeeData.map((item, index)=>(
//                 <tr key={index} className='border-b border-gray-300'>
//                   <td className='pl-2 py-2'>{index+1}</td>
//                   <td className='capitalize'>{item.employeeName}</td>
//                   <td>₹{item.salary}</td>
//                   <td>{item.joiningDate}</td>
//                   <td>
//                     <div className='space-x-2'>
//                       <button className='w-8 h-8 bg-indigo-600 text-white rounded-full' onClick={()=>editEmployee(item)}>
//                         <i className="ri-file-edit-line"></i>
//                       </button>

//                       <button className='w-8 h-8 bg-rose-600 text-white rounded-full' onClick={()=>deleteEmployee(item.uid)}>
//                         <i className="ri-delete-bin-6-line"></i>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default Crud;


