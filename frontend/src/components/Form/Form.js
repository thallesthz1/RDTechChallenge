import { Preferences, Features, RecommendationType } from './Fields'
import { SubmitButton } from './SubmitButton'
import useProducts from '../../hooks/useProducts'
import useForm from '../../hooks/useForm'
import useRecommendations from '../../hooks/useRecommendations'

function Form({ onUpdateRecommendations }) {
  const { preferences, features, products } = useProducts()
  const { formData, handleChange, resetForm } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  })

  const { getRecommendations, recommendations } = useRecommendations(products)

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataRecommendations = getRecommendations(formData)
    onUpdateRecommendations(dataRecommendations)
    resetForm()
  }

  return (
    <form
      className="w-full p-4 md:p-6 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />

      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selectedRecommendationType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  )
}

export default Form
