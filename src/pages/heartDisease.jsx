import { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HeartPulse,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";
import { DialogDemo } from "@/components/HeartDiseasePredicted";

const sexOptions = [
  { value: 1, label: "Male" },
  { value: 0, label: "Female" },
];

const chestPainOptions = [
  { value: 0, label: "Asymptomatic" },
  { value: 1, label: "Atypical Angina" },
  { value: 2, label: "Non-Anginal Pain" },
  { value: 3, label: "Typical Angina" },
];

const restingECGOptions = [
  { value: 0, label: "Normal" },
  { value: 1, label: "ST-T Wave Abnormality" },
  { value: 2, label: "Left Ventricular Hypertrophy" },
];

const exerciseAnginaOptions = [
  { value: 0, label: "No" },
  { value: 1, label: "Yes" },
];

const stSlopeOptions = [
  { value: 0, label: "Flat" },
  { value: 1, label: "Upsloping" },
  { value: 2, label: "Downsloping" },
];

const thalassemiaOptions = [
  { value: 1, label: "Fixed Defect" },
  { value: 2, label: "Normal" },
  { value: 3, label: "Reversible Defect" },
];

const fastingBSOptions = [
  { value: 0, label: "No (< 120 mg/dl)" },
  { value: 1, label: "Yes (≥ 120 mg/dl)" },
];

// Custom styles for react-select
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #e2e8f0",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #cbd5e1",
    },
    borderRadius: "0.375rem",
    padding: "2px",
    backgroundColor: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#6366f1"
      : state.isFocused
      ? "#f1f5f9"
      : "transparent",
    color: state.isSelected ? "white" : "#0f172a",
  }),
};

export default function HeartDiseasePredictorPage() {
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen]=useState(false)
  const [formData, setFormData] = useState({
    age: "",
    sex: null,
    cp: null,
    trestbps: "",
    chol: "",
    fbs: null,
    restecg: null,
    thalach: "",
    exang: null,
    oldpeak: "",
    slope: null,
    ca: "",
    thal: null,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : null,
    }));
  };

  const fetchData = async (inputData) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      console.log("Prediction:", data);
      setResult(data.prediction);
      setOpen(true)

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(formData);
  };

  const getOptionByValue = (options, value) =>
    value !== null ? options.find((option) => option.value === value) : null;

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading form...</p>
      </div>
    );
  }

  return (
        <section>
      <NavBar />
      <section className="md:px-20 px-5 py-8">

    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-none shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="h-6 w-6" />
              <CardTitle className="text-2xl font-bold">
                Heart Disease Risk Assessment
              </CardTitle>
            </div>
            <CardDescription className="text-indigo-100">
              Fill the form below to assess your heart health risk
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                <SelectField
                  label="Sex"
                  name="sex"
                  options={sexOptions}
                  value={formData.sex}
                  onChange={handleSelectChange}
                />
                <SelectField
                  label="Chest Pain Type"
                  name="cp"
                  options={chestPainOptions}
                  value={formData.cp}
                  onChange={handleSelectChange}
                />
                <InputField
                  label="Resting BP (mmHg)"
                  name="trestbps"
                  value={formData.trestbps}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Cholesterol (mg/dl)"
                  name="chol"
                  value={formData.chol}
                  onChange={handleInputChange}
                />
                <SelectField
                  label="Fasting Blood Sugar"
                  name="fbs"
                  options={fastingBSOptions}
                  value={formData.fbs}
                  onChange={handleSelectChange}
                />
                <SelectField
                  label="Resting ECG"
                  name="restecg"
                  options={restingECGOptions}
                  value={formData.restecg}
                  onChange={handleSelectChange}
                />
                <InputField
                  label="Max Heart Rate"
                  name="thalach"
                  value={formData.thalach}
                  onChange={handleInputChange}
                />
                <SelectField
                  label="Exercise-Induced Angina"
                  name="exang"
                  options={exerciseAnginaOptions}
                  value={formData.exang}
                  onChange={handleSelectChange}
                />
                <InputField
                  label="Oldpeak"
                  name="oldpeak"
                  value={formData.oldpeak}
                  onChange={handleInputChange}
                />
                <SelectField
                  label="ST Slope"
                  name="slope"
                  options={stSlopeOptions}
                  value={formData.slope}
                  onChange={handleSelectChange}
                />
                <InputField
                  label="Number of Major Vessels"
                  name="ca"
                  value={formData.ca}
                  onChange={handleInputChange}
                />
                <SelectField
                  label="Thalassemia"
                  name="thal"
                  options={thalassemiaOptions}
                  value={formData.thal}
                  onChange={handleSelectChange}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle className="animate-spin" size={16} />
                      Predicting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Predict Risk <ArrowRight size={16} />
                    </span>
                  )}
                </Button>
              </div>

              {result && (
                <div className="mt-4 text-center text-lg font-semibold text-indigo-700">
                  Prediction Result: {result}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </section>
    <DialogDemo open={open} setOpen={setOpen} prediction={result}/>
    </section>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={`Enter ${label.toLowerCase()}`}
        className="border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}

function SelectField({ label, name, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Select
        id={name}
        name={name}
        options={options}
        value={options.find((opt) => opt.value === value)}
        onChange={(option) => onChange(name, option)}
        styles={customSelectStyles}
        placeholder={`Select ${label.toLowerCase()}`}
        classNamePrefix="react-select"
      />
    </div>
  );
}
