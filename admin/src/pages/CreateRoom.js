import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../helper/utils.js";
import { createRoom, reset} from "../features/room/roomSlice.js";

// create room
const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);

  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    name: "test",
    price: 200,
    description: "description",
    roomNumbers: "401, 203, 232, 234",
  });

  const { name, price, description, roomNumbers } = formData;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
     if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
 }, [isSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomNumbers) {
      return;
    }

    const roomArray = roomNumbers.split(",").map((item) => {
      return {
        number: parseInt(item),
        unavailableDates: [],
      };
    });

    let list = [];
    list = await Promise.all(
      Object.values(files).map(async (file) => {
        const url = await uploadImage(file);
        return url;
      })
    );

    const dataToSubmit = {
      name,
      price,
      description,
      roomNumbers: roomArray,
      img: list,
    };

    // console.log(dataToSubmit)


    dispatch(createRoom(dataToSubmit));
  };

  return (
    <div className="container">
      <h1 className="heading center">Create Room</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={description}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="desc">Room Numbers</label>
            <textarea
              name="roomNumbers"
              onChange={handleChange}
              value={roomNumbers}
              placeholder="enter room numbers seperated by commas eg: 202, 203, 204, 400"
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="name">Images</label>
            <input
              type="file"
              name="file"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;