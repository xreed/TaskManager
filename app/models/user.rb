class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id, dependent: :restrict_with_error
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id, dependent: :nullify

  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true, format: { with: /@/, message: "incorrect e-mail" }

  def name
    "#{first_name} #{last_name}"
  end
end
