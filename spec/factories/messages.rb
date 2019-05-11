FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/spec/fixtures/files/sample.jpg")}
    user
    group
  end
end