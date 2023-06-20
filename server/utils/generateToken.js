import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '14d',
    issuer: 'qkrdmsgp_eh',
  });

  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
    issuer: 'qkrdmsgp_eh',
  });

  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1시간(ms)
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14일(ms)
    });
};

export default generateToken;
