export async function saveUser(req, res) {
try {
const { name, email, avatar } = req.body;

if (!name || !email) {
  return res.status(400).json({ success: false, message: 'Name and email are required' });
}

const User = (await import('../models/user.js')).default;

// Check if user exists
let user = await User.findOne({ email });

if (!user) {
  user = new User({
    name,
    email,
    avatar: avatar || '',
  });
  await user.save();
}

res.status(200).json({ success: true, user });
} catch (error) {
console.error('User save error:', error.message);
res.status(500).json({ success: false, message: 'Failed to save user', error: error.message });
}
}