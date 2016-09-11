var ljReply = {
	ui: {
		root: "yt-comments-list",
		commentItem: "comment-item",
		commentContent: "comment-text-content",
		commentButton: "yt-commentbox-show-reply",
		commentVideo: "thumb-title",
		replyInputId: "ytcb-text",
		replySendId: "ytcb-reply",
		replySelectList: "lj-reply",
		replySelectedItem: "lj-active-list",
		youtubeCommentIdAttr: "data-cid"
	}
};

ljReply.getCommentVideoName = function (comment) {
	var videoDom = comment.getElementsByClassName(ljReply.ui.commentVideo);

	if (videoDom.length == 0)
	{
		return "";
	}

	return (videoDom[0]).innerText;
};

ljReply.getCommentContent = function (comment) {
	return ((comment.getElementsByClassName(ljReply.ui.commentContent))[0]).innerText;
};

ljReply.getReplySelectDom = function (comment) {
	return (comment.getElementsByClassName(ljReply.ui.replySelectList))[0];
};

ljReply.addReplySelectList = function (comment) {
	if (ljReply.issetReplySelectList(comment))
	{
		return true;
	}

	var replySelect = document.createElement("div");
	var utId = comment.getAttribute(ljReply.ui.youtubeCommentIdAttr);

	replySelect.className = ljReply.ui.replySelectList;
	replySelect.setAttribute(ljReply.ui.youtubeCommentIdAttr, utId);

	comment.appendChild(replySelect);

	return true;
};

ljReply.issetReplySelectList = function (comment) {
	var replySelect = comment.getElementsByClassName(ljReply.ui.replySelectList);

	if (replySelect.length == 0)
	{
		return false;
	}

	return true;
};

ljReply.addReplySelectItem = function (comment, value) {
	var selectList = ljReply.getReplySelectDom(comment);

	if (ljReply.issetReplySelectItem(comment, value))
	{
		return true;
	}

	var item = document.createElement("div");
	item.innerText = value;

	selectList.appendChild(item);

	return true;
};

ljReply.issetReplySelectItem = function (comment, value) {
	var selectList = ljReply.getReplySelectDom(comment);

	var content = selectList.innerText;

	if (content.includes(value))
	{
		return true;
	}

	return false;
};

ljReply.commentContentMapping = function (content, videoName) {
	return ["1", "2", "3"];
};

ljReply.matchReply = function (comment) {
	var content = ljReply.getCommentContent(comment);
	var videoName = ljReply.getCommentVideoName(comment);
	var replys = ljReply.commentContentMapping(content, videoName);

	ljReply.addReplySelectList(comment);

	ljReply.addReplySelectItem(comment, replys[0]);
	ljReply.addReplySelectItem(comment, replys[1]);
	ljReply.addReplySelectItem(comment, replys[2]);
};

ljReply.init = function () {
	var lastComment = null;

	document.addEventListener("mousemove", function(e) {
		var hoverComment = e.target;

		if (hoverComment.className.includes(ljReply.ui.commentContent))
		{
			hoverComment = hoverComment.parentElement.parentElement.parentElement;
		}

		if (! hoverComment.className.includes(ljReply.ui.commentItem))
		{
			return true;
		}

		if (lastComment == hoverComment)
		{
			return true;
		}

		ljReply.matchReply(hoverComment);

		lastComment = hoverComment;

		return true;
	});
};
