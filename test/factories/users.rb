FactoryBot.define do
  factory :user do
    first_name { generate :string }
    last_name { generate :string }
    password { generate :string }
    email { generate :email }
    avatar { generate :string }
    type { "" }
  end
end
