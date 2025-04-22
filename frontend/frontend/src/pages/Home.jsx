import { useInsurance } from "../context/InsuranceContext";
import InsuranceCategorySelector from "../components/InsuranceCategorySelector";
import InsuranceSubtypeSelector from "../components/InsuranceSubtypeSelector";
import DynamicForm from "../components/DynamicForm";

const Home = () => {
  const { insuranceCategory, insuranceType } = useInsurance();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {!insuranceCategory ? (
          <InsuranceCategorySelector />
        ) : !insuranceType ? (
          <InsuranceSubtypeSelector />
        ) : (
          <DynamicForm />
        )}
      </div>
    </div>
  );
};

export default Home;
