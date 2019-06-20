FactoryBot.define do
  factory :task do
    name { generate :string }
    description { generate :string }
    author_id { create(:manager).id }
    assignee_id { create(:developer).id }
  end
end
