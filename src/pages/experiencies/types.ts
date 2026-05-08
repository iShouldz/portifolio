export interface IExperience {
  company: string
  role: string
  period: string
  location: string
  description: string
  tech: string[]
  icon: "academic" | "employment"
}

export interface IExperiencesListProps {
  experienciesList: IExperience[]
}
