import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "./CustomDialog";

function VaccineCreateModal({ show, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);

  const createVaccine = async () => {
    if (onSubmit) return;
    if (!name || name.trim().length === 0) {
      setNameErr(true);
      return;
    }
    setNameErr(false);
    setOnSubmit(true);

    try {
      const res = await vaccineApi.create({ name });
      setName("");
      onSuccess(res);
    } catch (err) {
      console.log(err);
    } finally {
      setOnSubmit(false);
    }
  };
  return (
    <CustomDialog
      open={show}
      title="Add vaccine"
      content={
        <Box padding="5px 0">
          <FormControl>
            <TextField
              label="Vaccine name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameErr}
            />
          </FormControl>
        </Box>
      }
      actions={
        <Box
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="text" onClick={() => onClose()}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            onClick={createVaccine}
            loading={onSubmit}
          >
            Create
          </LoadingButton>
        </Box>
      }
    />
  );
}

export default VaccineCreateModal;
