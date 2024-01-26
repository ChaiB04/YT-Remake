package be.ytbe.domain.enumeration;

public enum Role {
//    The owners have the complete set of rights,
//    and they can do anything, which includes
//    removing themselves as the owner.
    ADMIN,

//  A manager can upload, edit, and
//  delete videos; however, the YouTube
//  channel manager cannot invite or
//  add more people to the account.
    MANAGER,

//  The editors can edit everything,
//  but they can’t do anything to
//  the videos on the channel.
    EDITOR,

//  The viewers can see everything
//  on your channel, but they can’t
//  edit or add anything on the channel.
    VIEWER,

//  Deleted users so there is no key constraint error
    DELETED
}
