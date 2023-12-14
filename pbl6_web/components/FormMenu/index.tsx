import React, { useEffect, useReducer, useState } from "react";
import {
  Stack,
  Box,
  Button,
  Radio,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Skeleton,
  Typography,
  styled,
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import ButtonWithIcon from "../ButtonWithIcon";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/core/styles";
import { Label, StyledInput } from "@/components/InputForm";
import { useRouter, useSearchParams } from "next/navigation";
import { showMessage, unValidNumberField, unValidTextField } from "@/utils/parse.util";
import { localStorageClient } from "@/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { addMenuData, getListMenu, updateAvatarFood, updateIdCategory, updateMenuData } from "@/store/apps/menu";
import SaveIcon from '@mui/icons-material/Save';
const FormData = require("form-data");

const Img = styled("img")(({ theme }) => ({
  width: "300px",
  height: "300px",
}));

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    padding: "8px 12px",
    borderRadius: "8px",
    color: "#C7D0DD",
    background: "#fff",
    border: "1px solid #DAE2ED",
    boxShadow: "0px 2px 2px #F3F6F9",
    "&:hover": {
      borderColor: "#3399FF",
    },
    "&:focus": {
      outline: 0,
      borderColor: "#3399FF",
      boxShadow: "0 0 0 3px #3399FF",
    },
  },
  button: {
    textTransform: "uppercase",
    width: "150px",
  },
  closeButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FF4D49",
    "&:hover": {
      backgroundColor: "#FF4D49",
    },
  },
  saveButton: {
    background: "#64C623",
    "&:hover": {
      background: "#64C623",
    },
  },
}));

const FormMenu = (props: any) => {
  const { isAdd, id, menuDetailData, listCategory } = props;

  const token = localStorageClient.getItem("userToken");
  const dispatch = useDispatch<AppDispatch>();
  const { categoryId } = useSelector((state: any) => state.menu)

  const classes = useStyles();
  const router = useRouter();
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [imageUrl, setImageUrl] = useState<string | null>(menuDetailData?.image);

  const [ingredients, setIngredients] = useState<
    { seq: number; name: string }[]
  >([
    {
      seq: 1,
      name: "",
    },
  ]);
  const [processList, setProcessList] = useState<
    { seq: number; description: string }[]
  >([
    {
      seq: 1,
      description: "",
    },
  ]);
  const [state, setState] = useReducer(
    (prevState: any, newState: any) => ({
      ...prevState,
      ...newState,
    }),
    {
      name: "",
      description: "",
      price: "",
      foodMakingProcessRequest: [
        {
          seq: 0,
          description: "",
        },
      ],
      ingredientsOfFoodRequest: [
        {
          seq: 0,
          name: "",
        },
      ],
      errName: "",
      errPrice: "",
      errDescription: "",
      errProcesses: "",
      errIngredients: ""
    }
  );
  const {
    name,
    description,
    price,
    foodMakingProcessRequest,
    ingredientsOfFoodRequest,
    errName,
    errDescription,
    errPrice,
    errProcesses,
    errIngredients
  } = state;

  useEffect(() => {
    !isAdd && setIngredients(menuDetailData?.ingredientsOfFoods || menuDetailData?.ingredientsOfFoodResponse);
    !isAdd && setProcessList(menuDetailData?.foodMakingProcesses || menuDetailData?.foodMakingProcessResponse);
    !isAdd &&
      setState({
        ...state,
        name: menuDetailData.name,
        description: menuDetailData.description,
        price: menuDetailData.price,
        foodMakingProcessRequest: menuDetailData?.foodMakingProcesses || menuDetailData.foodMakingProcessResponse,
        ingredientsOfFoodRequest: menuDetailData.ingredientsOfFoods || menuDetailData.ingredientsOfFoodResponse,
      });
  }, [menuDetailData]);

  // useEffect(() => {
  //   if (isUploadImage) {
  //     dispatch(updateAvatarFood({ id, formData, token }));
  //     setIsUploadImage(false);
  //   }
  // }, [formData]);

  const handleFileUpload = (event: any) => {
    setIsUploadImage(true);
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string" || result === null) {
          setImageUrl(result);
        }
        if (typeof file === "undefined") return;
        const newFormData = new FormData();
        newFormData.append("image", file);
        setFormData(newFormData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        seq: ingredients.length + 1,
        name: "",
      },
    ]);
  };

  const handleRemoveIngredient = (index: any) => {
    const list = [...ingredients];
    list.splice(index, 1);
    setIngredients(list);
    setState({
      ...state,
      ingredientsOfFoodRequest: list,
    });
  };

  const handleChangeIngredient = (e: any, index: any) => {
    const { name, value } = e.target;
    const list = [...ingredients];
    list[index] = {
      ...list[index],
      [name]: value,
    };
    setIngredients(list);
    setState({
      ...state,
      ingredientsOfFoodRequest: list,
    });
    resetError();
  };

  const handleAddProcess = () => {
    setProcessList([
      ...processList,
      {
        seq: processList.length + 1,
        description: "",
      },
    ]);
  };

  const handleRemoveProcess = (index: any) => {
    const list = [...processList];
    list.splice(index, 1);
    setProcessList(list);
    setState({
      ...state,
      foodMakingProcessRequest: list,
    });
  };

  const handleChangeProcess = (e: any, index: any) => {
    const { name, value } = e.target;
    const list = [...processList];
    list[index] = {
      ...list[index],
      [name]: value,
    };
    setProcessList(list);
    setState({
      ...state,
      foodMakingProcessRequest: list,
    });
    resetError();
  };

  const resetError = () => {
    const errorState: { [key: string]: string } = {};
    let isFoodMakingProcessValid = true;
    let isIngredientsValid = true;
    if (name !== "") {
      errorState.errName = "";
    }
    if (price !== "") {
      errorState.errPrice = "";
    }
    if (description !== "") {
      errorState.errDescription = "";
    }
    for (const item of foodMakingProcessRequest) {
      if (item.description.trim() === "") {
        isFoodMakingProcessValid = false
        break
      }
    }
    for (const item of ingredientsOfFoodRequest) {
      if (item.name.trim() === "") {
        isIngredientsValid = false;
        break;
      }
    }
    if(isFoodMakingProcessValid) {
      errorState.errProcesses = ""
    }
    if(isIngredientsValid) {
      errorState.errIngredients = ""
    }
    setState(errorState);
  };

  const handleChangeValue = (e: any) => {
    const { name, value } = e.target;

    resetError();
    setState({ [name]: value });
  };

  const validateInput = () => {
    const errorState: { [key: string]: string } = {};
    if (unValidTextField(name)) {
      errorState.errName = "Name is not valid";
    }
    if (description === "") {
      errorState.errDescription = "Description is null";
    }
    if (unValidNumberField(price.toString())) {
      errorState.errPrice = "Price is not valid";
    }
    for (const item of state.foodMakingProcessRequest) {
      if (item.description === "") {
        errorState.errProcesses = "Food making process is not valid";
        break;
      }
    }
    for (const item of state.ingredientsOfFoodRequest) {
      if (item.name === "") {
        errorState.errIngredients = "Ingredients are not valid";
        break;
      }
    }
    setState(errorState);
    if (
      !unValidTextField(name) &&
      description !== "" &&
      !unValidNumberField(price.toString()) &&
      !errorState.errProcesses &&
      !errorState.errIngredients
    ) {
      return true;
    }
    return false;
  };

  const handleAdd = async () => {
    const isValid = validateInput();
    if (!isValid) {
      return;
    }
    const data = {
      name,
      description,
      price,
      categoryId,
      foodMakingProcessRequest: processList,
      ingredientsOfFoodRequest: ingredients,
    };
    setState((prevState: any) => ({
      ...prevState,
      ...data,
    }));
    if (!token) {
      showMessage("Token is missing", false);
      return;
    }
    try {
      const menuResult: any = await dispatch(addMenuData({ data, token }));
      if (!menuResult.payload) {
        showMessage(menuResult.error.message, false);
        return;
      }
      if (isUploadImage) {
        const avatarResult = await dispatch(updateAvatarFood({ id: menuResult.payload.id, formData, token }));
  
        setIsUploadImage(false);
  
        if (avatarResult.payload) {
          const menuListResult = await dispatch(getListMenu({}));
  
          if (menuListResult.payload) {
            showMessage("Add food is successful", true);
            setTimeout(() => {
              router.push('/admin/menu');
            }, 1000);
          }
        }
      }
    } catch (error) {
      showMessage("An error occurred", false);
      console.error(error);
    }
  };

  const handleEdit = async () => {
    const isValid = validateInput();
    if (isValid) {
      const data = {
        name,
        description,
        price,
        categoryId,
        foodMakingProcessRequest: processList,
        ingredientsOfFoodRequest: ingredients,
      };
      
      setState({
        ...state,
        ...data,
      });
      if(token){
        const res: any = await dispatch(updateMenuData({id, data, token}))
          if(res.payload) {
            if (isUploadImage) {
              const resUpload: any = await dispatch(updateAvatarFood({ id, formData, token }));
              if(resUpload.payload){
                setIsUploadImage(false);
              }
            }
            showMessage("Update food is successful", true)
          }
          else {
            showMessage(res.error.message, false)
          }
      }
    }
  }

  const handleClick = () => {
    isAdd ? handleAdd() : handleEdit()
  }

  return (
    <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <Stack direction={"row"} gap="30px" justifyContent={"space-between"}>
        <Box className="flex items-center gap-4">
          <IconButton
            onClick={() => {
              router.back();
            }}
          >
            <Icon icon={"majesticons:arrow-left"} />
          </IconButton>
          <Typography variant="h5">
              {isAdd ? "ADD FOOD" : "EDIT FOOD"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleClick}
          className={`${classes.button} ${classes.saveButton}`}
          startIcon={<SaveIcon />}
        >
          save
        </Button>
      </Stack>
      <Grid container spacing={2} className="w-full m-0 ">
        <Grid item xs={8} className="bg-white flex justify-center">
          <FormControl
            defaultValue=""
            required
            fullWidth
            className="h-full p-[40px]"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} className="flex flex-col">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Label>Food name</Label>
                    <StyledInput
                      placeholder="Food name"
                      name="name"
                      value={name}
                      onChange={handleChangeValue}
                    />
                    {errName && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errName}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={6} sx={{position: "relative"}}>
                    <Label>
                      Price
                    </Label>
                    <StyledInput
                      type="number"
                      placeholder="Price"
                      name="price"
                      value={price || ""}
                      onChange={(e) => {
                        setState({ price: +e.target.value })
                      }}
                      sx={{
                        "& .MuiInput-input": {
                          padding: "8px 30px 8px 12px"
                        }
                      }}
                    />
                    <span className="absolute bottom-[8%] right-[2%] text-[20px] text-[#FC5A5A] font-semibold">$</span>
                    {errPrice && (
                      <p className="ml-[15px] my-[8px] text-[red] h-8">
                        {errPrice}
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex flex-col">
                <Box>
                  <Label>Descriptions</Label>
                  <TextField
                    className={classes.input}
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={handleChangeValue}
                    multiline
                    rows={5}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "0",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  />
                  {errDescription && (
                    <p className="ml-[15px] my-[8px] text-[red] h-8">
                      {errDescription}
                    </p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} className="flex flex-col">
                <Box>
                  <Label>Ingredients</Label>
                  {ingredients.map((ingredient, index) => (
                    <Grid
                      key={index}
                      container
                      spacing={2}
                      sx={{ marginTop: `${index !== 0 ? "5px" : "undefined"}` }}
                    >
                      <Grid item xs={10}>
                        <TextField
                          className={classes.input}
                          required
                          name="name"
                          onChange={(e) => handleChangeIngredient(e, index)}
                          value={ingredient.name}
                          multiline
                          maxRows={2}
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "0",
                              wordWrap: "break-word",
                            },
                            "& .MuiOutlinedInput-root": {
                              padding: "0",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                          }}
                        />
                        {ingredients.length - 1 === index && (
                          <ButtonWithIcon
                            icon={<AddCircleIcon />}
                            label=" ADD"
                            bgColor="#28A745"
                            onClick={handleAddIngredient}
                            sx={{marginTop: "10px"}}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        {ingredients.length > 1 && (
                          <Button
                            sx={{
                              color: "#FF4D49",
                              "&:hover": { backgroundColor: "#ff4d491a" },
                            }}
                            onClick={() => handleRemoveIngredient(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                  {errIngredients && (
                    <p className="ml-[15px] my-[8px] text-[red] h-8">
                      {errIngredients}
                    </p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} className="flex flex-col">
                <Box>
                  <Label>Making Process</Label>
                  {processList.map((process, index) => (
                    <Grid
                      key={index}
                      container
                      spacing={2}
                      sx={{ marginTop: `${index !== 0 ? "5px" : "undefined"}` }}
                    >
                      <Grid item xs={10}>
                        <TextField
                          className={classes.input}
                          required
                          name="description"
                          onChange={(e) => handleChangeProcess(e, index)}
                          value={process.description}
                          multiline
                          maxRows={2}
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "0",
                              wordWrap: "break-word",
                            },
                            "& .MuiOutlinedInput-root": {
                              padding: "0",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                          }}
                        />
                        {processList.length - 1 === index && (
                          <ButtonWithIcon
                            icon={<AddCircleIcon />}
                            label=" ADD"
                            bgColor="#28A745"
                            onClick={handleAddProcess}
                            sx={{marginTop: "10px"}}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        {processList.length > 1 && (
                          <Button
                            sx={{
                              color: "#FF4D49",
                              "&:hover": { backgroundColor: "#ff4d491a" },
                            }}
                            onClick={() => handleRemoveProcess(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                  {errProcesses && (
                    <p className="ml-[15px] my-[8px] text-[red] h-8">
                      {errProcesses}
                    </p>
                  )}
                </Box>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={4} className="bg-white !py-5 !px-[16px]">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
              }}
            >
              {false ? (
                <Skeleton variant="rounded" width={120} height={120} />
              ) : (
                <Img
                  alt="avatar"
                  src={
                    imageUrl ||
                    "/assets/images/no-photo-available.png"
                  }
                />
              )}
              <Box>
                <Button
                  component="label"
                  variant="contained"
                >
                  Upload
                  <input
                  id="upload-image"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileUpload}
                />
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mx: "8px !important", marginTop: "20px" }} />
            <Box sx={{ padding: "0 10px" }}>
              <FormControl sx={{width: "100%"}}>
                <FormLabel
                  sx={{
                    marginTop: "16px",
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "15px",
                    letterSpacing: "0.4px",
                    color: "#000",
                  }}
                >
                  Categories
                </FormLabel>
                <RadioGroup value={categoryId || 10} sx={{ padding: "0 20px", marginTop: "10px", height: "250px", overflowY: "scroll", flexWrap: "nowrap" }} onChange={(e) => {
                    const id = e.target.value
                    setState({
                        ...state,
                        categoryId: +id
                    })
                    dispatch(updateIdCategory(+id))
                }}>
                  {listCategory.map((item: any) => (
                    <FormControlLabel
                      control={<Radio />}
                      label={item.name}
                      key={item.id}
                      value={item.id}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormMenu;
