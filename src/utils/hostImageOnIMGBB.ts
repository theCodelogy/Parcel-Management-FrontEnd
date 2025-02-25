export const hostImage=async(image:File)=>{
 //   image upload to imgBb
 const formData = new FormData()
 try{
    formData.append('image', image)
    const res= await fetch('https://api.imgbb.com/1/upload?key=f5f995dbfff98c6b0a7f18d30bf596c3', {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    if (data.success) {
        const imgUrl =data.data.display_url;
        return imgUrl
     }
 }catch(err){
    return(err)
 }

}