require 'test_helper'

class Web::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get new_session_url
    assert_response :success
  end

  test "should post create" do
    password = generate(:string)
    email = generate(:string) + '@' + generate(:string) + '.' + generate(:string)
    user = create(:user, {password: password, email: email})
    attrs = {
      email: user.email,
      password: password
    }
    post session_url, params: { session: attrs }
    assert_response :redirect
  end
  
  test "should delete destroy" do
    delete session_url
    assert_response :redirect
  end
end
