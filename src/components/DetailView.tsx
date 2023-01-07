import PersonInterface from "../interfaces/person";
import { Modal, Box, Stack, Avatar } from "@mui/material";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";

function DetailView({
   person,
   open,
   isDarkModeEnabled,
   handleClose,
}: {
   person: PersonInterface | undefined;
   open: boolean;
   isDarkModeEnabled: boolean;
   handleClose: () => void;
}) {
   const style = {
      position: "absolute" as "absolute",
      top: "35%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      bgcolor: isDarkModeEnabled ? "#212121" : "#f4f4f4",
      boxShadow: 24,
      p: 4,
   };

   return person != null ? (
      <Modal open={open} onClose={handleClose}>
         <Box sx={style}>
            <Stack direction="column">
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     width: "100%",
                     alignItems: "center",
                  }}
               >
                  <Stack direction="row" alignItems="center" spacing={2}>
                     <Avatar src={person.avatar} sx={{ width: 111, height: 111 }} />
                     <h1 style={{ color: isDarkModeEnabled ? "white" : "black" }}>
                        {person.first_name} {person.last_name}
                     </h1>
                  </Stack>
                  <h3 style={{ color: isDarkModeEnabled ? "white" : "black" }}>@{person.username}</h3>
               </div>
               <h1 style={{ color: isDarkModeEnabled ? "white" : "black", paddingTop: "15px" }}>Information</h1>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     width: "100%",
                     alignItems: "center",
                     paddingTop: "15px",
                  }}
               >
                  <Stack direction="row" alignItems="center" spacing={1}>
                     <MailRoundedIcon style={{ color: isDarkModeEnabled ? "white" : "black" }} />
                     <h3 style={{ color: isDarkModeEnabled ? "white" : "black" }}>Email</h3>
                  </Stack>
                  <h3 style={{ color: isDarkModeEnabled ? "white" : "black" }}>{person.email}</h3>
               </div>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     width: "100%",
                     alignItems: "center",
                     paddingTop: "15px",
                  }}
               >
                  <Stack direction="row" alignItems="center" spacing={1}>
                     <TodayRoundedIcon style={{ color: isDarkModeEnabled ? "white" : "black" }} />
                     <h3 style={{ color: isDarkModeEnabled ? "white" : "black" }}>Age</h3>
                  </Stack>
                  <h3 style={{ color: isDarkModeEnabled ? "white" : "black" }}>{person.age}</h3>
               </div>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     width: "100%",
                     alignItems: "center",
                     paddingTop: "15px",
                  }}
               >
                  <Stack direction="row" alignItems="center" spacing={1}>
                     <LocationOnRoundedIcon style={{ color: isDarkModeEnabled ? "white" : "black" }} />
                     <h3 style={{ color: isDarkModeEnabled ? "white" : "black" }}>Location</h3>
                  </Stack>
                  <h3 style={{ color: isDarkModeEnabled ? "white" : "black" }}>
                     {person.city} {person.state}, {person.country}
                  </h3>
               </div>
            </Stack>
         </Box>
      </Modal>
   ) : null;
}

export default DetailView;
