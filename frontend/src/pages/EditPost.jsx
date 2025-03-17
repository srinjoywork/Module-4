import { useContext, useEffect, useState , useRef } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { Textarea, Field, Input, Button ,makeStyles,tokens } from "@fluentui/react-components";
import { ArrowUploadRegular, DismissRegular } from "@fluentui/react-icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const useStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalMNudge,
  },
});


const EditPost = () => {
    const fileInputRef = useRef(null);
    const postId=useParams().id
    const {user}=useContext(UserContext)
    const navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])

    const styles = useStyles();
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const fetchPost=async()=>{
      try{
        const res=await axios.get(URL+"/api/posts/"+postId)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)
        setCats(res.data.categories)

      }
      catch(err){
        console.log(err)
      }
    }

    const handleUpdate=async (e)=>{
      e.preventDefault()
      const post={
        title,
        desc,
        username:user.username,
        userId:user._id,
        categories:cats
      }

      if(file){
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        post.photo=filename
        // console.log(data)
        //img upload
        try{
          const imgUpload=await axios.post(URL+"/api/upload",data)
          // console.log(imgUpload.data)
        }
        catch(err){
          console.log(err)
        }
      }
      //post upload
     
      try{
        const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
        navigate("/posts/post/"+res.data._id)
        // console.log(res.data)

      }
      catch(err){
        console.log(err)
      }
    }

    

    useEffect(()=>{
      fetchPost()
    },[postId])

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i)
       setCats(updatedCats)
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }
  return (
    <div>
  <Navbar />

  <div className={styles.base}>
    <div className="px-6 md:px-[200px] mt-8">
      <h1 className="font-bold md:text-2xl text-xl">Update a post</h1>

      <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
        {/* Post Title */}
        <Field label="Post Title">
          <Textarea
            resize="none"
            placeholder="Enter post title"
            className="text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        {/* File Upload */}
        <Field label="Upload Image">
          <div className="flex items-center space-x-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {/* Upload button */}
            <Button
              icon={<ArrowUploadRegular />}
              appearance="primary"
              onClick={handleButtonClick}
            >
              Upload File
            </Button>

            {/* Show file name if selected */}
            {file && <span className="text-sm">{file.name}</span>}
          </div>
        </Field>

        {/* Categories Input + Add */}
        <Field label="Categories">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4 md:space-x-8">
              <Input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                placeholder="Enter post category"
                className="w-full md:w-[60%]"
              />
              <Button
                appearance="primary"
                onClick={addCategory}
                className="font-semibold"
                type="button"
              >
                Add
              </Button>
            </div>

            {/* Categories List */}
            <div className="flex flex-wrap mt-3 space-x-2">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mb-2 bg-gray-200 px-3 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <Button
                    icon={<DismissRegular />}
                    appearance="transparent"
                    onClick={() => deleteCategory(i)}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </div>
        </Field>

        {/* Post Description */}
        <Field label="Post Description">
          <div className="text-black">
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={setDesc}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  ['code-block'],
                  [{ color: [] }, { background: [] }],
                  ['clean'],
                ],
              }}
              formats={[
                'header',
                'bold', 'italic', 'underline',
                'code-block',
                'color', 'background',
              ]}
              placeholder="Write something amazing..."
              style={{ height: '300px', color: 'black', marginBottom:"20px" }}
            />
          </div>
        </Field>

        {/* Update Button */}
        <Button
          onClick={handleUpdate}
          appearance="primary"
          className="w-full md:w-[20%] mx-auto font-semibold md:text-xl text-lg"
        >
          Update
        </Button>
      </form>
    </div>
  </div>

  <Footer />
</div>

  )
}

export default EditPost