import { useForm, FormProvider, Controller } from "react-hook-form";
import { useInsurance } from "../context/InsuranceContext";
import { INSURANCE_FIELDS } from "../utils/constants";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DynamicForm = () => {
  const {
    insuranceCategory,
    insuranceType,
    formData,
    setFormData,
    setResult,
  } = useInsurance();

  const fields = INSURANCE_FIELDS[insuranceType] || [];
  const navigate = useNavigate();

  const defaultValues = {};
  fields.forEach((field) => {
    defaultValues[field.name] =
      field.type === "multi-select" ? formData[field.name] || [] : formData[field.name] || "";
  });

  const methods = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setFormData(data);

    const payload = {
      category: insuranceCategory,
      sub_type: insuranceType,
      data: data,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/insurance/calculate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("❌ Error from backend:", err);
        throw new Error(err?.detail || "Backend returned an error");
      }

      const result = await response.json();
      setResult(result);
      navigate("/result");
    } catch (err) {
      console.error("Premium calculation failed:", err);
      alert(err.message || "Something went wrong! Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          maxWidth: "600px",
          mx: "auto",
          mt: 8,
          px: 3,
          py: 4,
          borderRadius: 3,
          bgcolor: "#fff",
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
          {insuranceType} Insurance Form
        </Typography>

        {fields.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" mt={2}>
            No fields defined for this insurance type yet.
          </Typography>
        ) : (
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            {fields.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={methods.control}
                rules={{ required: `${field.label} is required` }}
                render={({ field: controllerField, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error} variant="outlined">
                    {field.type === "dropdown" ? (
                      <>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          {...controllerField}
                          name={field.name}
                          label={field.label}
                          input={<OutlinedInput label={field.label} />}
                        >
                          {field.options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    ) : field.type === "multi-select" ? (
                      <>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          {...controllerField}
                          name={field.name}
                          multiple
                          input={<OutlinedInput label={field.label} />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {field.options.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox
                                checked={
                                  Array.isArray(controllerField.value) &&
                                  controllerField.value.includes(option)
                                }
                              />
                              <ListItemText primary={option} />
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    ) : (
                      <TextField
                        {...controllerField}
                        name={field.name}
                        fullWidth
                        label={field.label}
                        variant="outlined"
                        multiline={field.type === "textarea"}
                        rows={field.type === "textarea" ? 3 : 1}
                        type={field.type !== "textarea" ? field.type : "text"}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                    {fieldState.error && (
                      <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            ))}
          </Box>
        )}

        <Box textAlign="center" mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 2, px: 4, py: 1.5 }}
          >
            Calculate Premium
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default DynamicForm;
