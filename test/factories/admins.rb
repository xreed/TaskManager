FactoryBot.define do
  factory :admin do
    first_name { generate :string }
    last_name { generate :string }
    email { generate(:string) + '@' + generate(:string) + '.' + generate(:string) }
    password {generate :string }
  end
end
