require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    password = generate(:string)
    email = generate(:string) + '@' + generate(:string) + '.' + generate(:string)
    user = create(:user, {password: password, email: email})
    get admin_user_url(user)
    assert_response :success
  end
end