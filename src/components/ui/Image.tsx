import { hostImage } from "../../utils/hostImageOnIMGBB";
import { generateStatus } from "../../utils/statusGenerator";

const Image = () => {
  const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    const imageUrl = await hostImage(image);
    const status =await generateStatus({ title: "Delivery Man Assigned",statusDetails:{ deliveryMan:"John Doe"} });
    console.log(imageUrl);
    console.log(status);
  };
  return (
    <div className="flex justify-center items-center py-10">
      <form onSubmit={formHandle}>
        <input
          required
          type="file"
          name="image"
          className="px-4 mt-1 w-full py-2 drop-shadow-lg rounded "
          id=""
        />
        <input
          className="w-full font-bold  cursor-pointer py-3 rounded-md text-white bg-teal-600"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Image;
