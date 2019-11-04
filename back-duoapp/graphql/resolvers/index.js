const User = require('../../models/user');
const Recruitment = require('../../models/recruitment');
const Applicant = require('../../models/applicant');
const mongoose = require('mongoose');

// const events = async eventIds => {
//     try {
//         const events = await Event.find({ _id: { $in: eventIds } });
//         events.map(event => {
//         return {
//             ...event._doc,
//             _id: event.id,
//             date: new Date(event._doc.date).toISOString(),
//             creator: user.bind(this, event.creator)
//         };
//         });
//         return events;
//     } catch (err) {
//         throw err;
//     }
// };

// const user = async userId => {
//     try {
//         const user = await User.findById(userId);
//         return {
//         ...user._doc,
//         _id: user.id,
//         createdEvents: events.bind(this, user._doc.createdEvents)
//         };
//     } catch (err) {
//         throw err;
//     }
// };

const recruitment = async recruitmentId => {
    try {
        const recruitment = await Recruitment.findById(recruitmentId);
        return {
            ...recruitment._doc,
            _id:  recruitment.id,
            position: recruitment.position,
            status: recruitment.status
        };
    } catch (err) {
        throw err;
    }
}


module.exports = {
    // events: async () => {
    //     try {
    //         const events = await Event.find();
    //         return events.map(event => {
    //             return {
    //             ...event._doc,
    //             _id: event.id,
    //             date: new Date(event._doc.date).toISOString(),
    //             creator: user.bind(this, event._doc.creator)
    //             };
    //         });
    //     } catch (err) {
    //        throw err;
    //     }
    // },

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

    recruitmentsAndUsers: async () => {
        try {
            const recruitments = await Recruitment.find().sort({updated_at: -1});
            return recruitments.map(async recruitment => {
                const user = await User.findById({_id: recruitment.userId});
                return {
                    ...recruitment._doc,
                    _id: recruitment.id,
                    userId: recruitment.userId,
                    position: recruitment.position,
                    status: recruitment.status,
                    username: user.username,
                    nicknames: user.nicknames,
                    representationNickname: user.representationNickname,
                    tiers: user.tiers,
                    majorPosition: user.majorPosition,
                    minorPosition: user.minorPosition,
                    apiUpdatedAt: user.apiUpdatedAt,
                    recentgames: user.recentgames,
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

    // createEvent: async args => {
    //     const event = new Event({
    //     title: args.eventInput.title,
    //     description: args.eventInput.description,
    //     price: +args.eventInput.price,
    //     date: new Date(args.eventInput.date),
    //     creator: '5db63fe7e7b9d0134436cc22'
    //     });
    //     let createdEvent;
    //     try {
    //         const result = await event.save();
    //         createdEvent = {
    //             ...result._doc,
    //             _id: result._doc._id.toString(),
    //             date: new Date(event._doc.date).toISOString(),
    //             creator: user.bind(this, result._doc.creator)
    //         };
    //         const creator = await User.findById('5db63fe7e7b9d0134436cc22');

    //         if (!creator) {
    //             throw new Error('User not found.');
    //         }
    //         //creator.createdEvents.push(event);
    //         await creator.save();
    //         return createdEvent;
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // },

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
            console.log(user.username);
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