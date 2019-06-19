FactoryBot.define do
  factory :user do
    first_name { generate(:string) }
    last_name { generate(:string) }
    password { generate(:string) }
    email { generate(:string) + '@' + generate(:string) + '.' + generate(:string) }
    avatar { generate(:string) }
    type { "" }
  end
end
