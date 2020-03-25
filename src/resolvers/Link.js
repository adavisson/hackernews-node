const postedBy = (parent, args, context) => {
  return context.prisma.link({ id: parent.id }).postedby()
}

module.exports = {
  postedBy
}