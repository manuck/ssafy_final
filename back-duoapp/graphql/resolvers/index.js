const User = require('../../models/user');
const Recruitment = require('../../models/recruitment');
const Applicant = require('../../models/applicant');

module.exports = {
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return {
                    _id: user._id,
                    username: user.username,
                    nicknames: user.nicknames,
                    representationNickname: user.representationNickname,
                    tiers: user.tiers,
                    majorPosition: user.majorPosition,
                    minorPosition: user.minorPosition,
                    apiUpdatedAt: user.apiUpdatedAt,
                    recentgames: user.recentgames,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            })
        } catch (err) {
            throw err;
         }
    },

    recruitments: async () => {
        try {
            const recruitments = await Recruitment.find();
            return recruitments.map(recruitment => {
                return {
                    ...recruitment._doc,
                    _id: recruitment.id,
                    userId: recruitment.userId,
                    position: recruitment.position,
                    status: recruitment.status,
                    created_at : recruitment.created_at,
                    updated_at : recruitment.updated_at
                };
            });
        } catch (err) {
            throw err;
         }
    },

    recruitmentAndWriters: async () => {
        try {
            const recruitments = await Recruitment.find().sort({updated_at: -1});
            return recruitments.map(async recruitment => {
                const user = await User.findById({_id: recruitment.userId});
                return {
                    ...recruitment._doc,
                    _id: recruitment.id,
                    position: recruitment.position,
                    status: recruitment.status,
                    writer: user,
                    created_at : recruitment.created_at,
                    updated_at : recruitment.updated_at
                }
            })
        } catch (err) {
            throw err;
         }
    },

    recruitmentAndApplicants: async args => {
        try {
            const recruitment = await Recruitment.findById({_id: args.recruitId});
            if(!recruitment) {
                throw new Error('Recruitment not exists');
            }
            const user = await User.findById({_id: recruitment.userId});
            if(!user) {
                throw new Error('User not exists');
            }
            const applicants = await Applicant.find({recruitmentId: args.recruitId});
            const applicantUsers = [];
            const result = await applicants.forEach(applicant => {
                applicantUsers.push(User.findById({_id:applicant.userId}));
            });
            return {
                _id: recruitment._id,
                position: recruitment.position,
                status: recruitment.status,
                writer: user,
                applicants: applicantUsers,
                created_at: recruitment.created_at,
                updated_at: recruitment.updated_at
            }
        } catch (err) {
            throw err;
         }
    },


    getUser: async args => {
        try {
            const user = await User.findById({_id: args.userId});
            return user;
        } catch (err) {
            throw err;
         }
    },

    getUserByUsername: async args => {
        try {
            const user = await User.findOne({ username: args.searchUserInput.username });
            if(!user) {
                throw new Error('User not exists');
            }
            return user
        } catch (err) {
            throw err;
         }
    },

    createUser: async args => {
        try{
            const existUser = await User.findOne({ username: args.createUserInput.username });
            if(existUser) {
                throw new Error('User exists already.');
            }
            const user = new User({
                username: args.createUserInput.username
            });
            const result = await user.save();
            return { 
                ...result._doc,
                _id: result.id,
                username: user.username
            };
        } catch (err) {
            throw err;
        }
    },

    createRecruitment: async args => {
        try {
            const userId = await User.findOne({ username: args.createRecruitmentInput.username });
            const existRecruitment = await Recruitment.findOne({ userId : userId });
            if(existRecruitment) {
                const updateRecuritment = await existRecruitment.update( {
                    status: true,
                    position: args.createRecruitmentInput.position
                } );
                return { 
                    ...updateRecuritment._doc,
                    userId: userId._id,
                    position: args.createRecruitmentInput.position,
                    status: true,
                    created_at : existRecruitment.created_at,
                    updated_at : existRecruitment.updated_at
                };
            }
            else {
                const recruitment = new Recruitment({
                    userId: userId._id,
                    position: args.createRecruitmentInput.position,
                    status: true
                });
                const result = await recruitment.save();
                return { 
                    ...result._doc,
                    userId: result.userId,
                    position: result.position,
                    status: result.status,
                    created_at : result.created_at,
                    updated_at : result.updated_at
                };
            }
            
        } catch (err) {
            throw err;
        }
    },

    createApplicant: async args => {
        try {
            const user = await User.findOne({ _id: args.createApplicantInput.userId });
            const recuritment = await Recruitment.findOne({ _id: args.createApplicantInput.recruitmentId });
            if(!user) {
                throw new Error('User not exists');
            }
            if(!recuritment) {
                throw new Error('Recruitment not exists');
            }
            const applicant = new Applicant({
                userId: args.createApplicantInput.userId,
                recruitmentId: args.createApplicantInput.recruitmentId,
                position: args.createApplicantInput.position
            });
            const result = await applicant.save();
            return {
                ...result._doc,
                userId: applicant.userId,
                recruitmentId: applicant.recruitmentId,
                position: applicant.position,
                created_at : applicant.created_at,
                updated_at : applicant.updated_at
            };
        } catch (err) {
            throw err;
        }
    },

    updateUser: async args => {
        try {
            const user = await User.findOne({ username: args.updateUserInput.username });
            if(!user) {
                throw new Error('User not exists');
            }
            const updateResult = await user.update(
                {
                    $set: { 
                        nicknames: args.updateUserInput.nicknames,
                        representationNickname: args.updateUserInput.representationNickname,
                        majorPosition: args.updateUserInput.majorPosition,
                        minorPosition:  args.updateUserInput.minorPosition,
                        apiUpdatedAt:  args.updateUserInput.apiUpdatedAt,
                        tiers: args.updateTierInput,
                        recentgames: args.updateGameInput
                    }
                }
            );
            return {
                ...updateResult._doc,
                username: args.updateUserInput.username,
                representationNickname: args.updateUserInput.representationNickname,
                majorPosition: args.updateUserInput.majorPosition,
                minorPosition:  args.updateUserInput.minorPosition,
                apiUpdatedAt:  args.updateUserInput.apiUpdatedAt,
                tiers: args.updateTierInput,
                recentgames: args.updateGameInput
            };
        } catch (err) {
            throw err;
        }
    },

    updateRecruitment: async args => {
        try {
            const recruitment = await Recruitment.findOne({_id: args.updateRecruitmentInput.id});
            if(!recruitment) {
                throw new Error('Recuritment not exists');
            }
            const recruitmentResult = await recruitment.update(
                {
                    $set :{
                        position: args.updateRecruitmentInput.position,
                        status: true
                    }        
                }
            );
            return {    
                ...recruitmentResult._doc,            
                userId: recruitment.userId,          
                position: recruitment.position,
                status: recruitment.status,
                created_at : recruitment.created_at,
                updated_at : recruitment.updated_at
            };
        } catch (err) {
            throw err;
        }
    },

    deleteUser: async args => {
        try {          
            const result = await User.findByIdAndDelete({_id: args.deleteUserInput});
            return true;
        } catch (err) {
            throw err;
        }
    },
    deleteRecruitment: async args => {
        try {          
            const resultA = await Applicant.deleteMany({ recruitmentId: args.deleteRecruitmentInput });
            const resultR = await Recruitment.findByIdAndDelete({ _id: args.deleteRecruitmentInput });
            return true;
        } catch (err) {
            throw err;
        }
    },

    deleteApplicant: async args => {
        try {
            const result = await Applicant.findByIdAndDelete({_id: args.deleteApplicantInput});
            return true;
        } catch (err) {
            throw err;
        }
    }

};