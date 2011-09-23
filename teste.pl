#!/usr/bin/perl 
use Mojolicious::Lite;
use FreeDOM::Test;
use Data::Dumper;
use Mojo::JSON;

my $db = FreeDOM::Test->connect("dbi:SQLite:./FreeDOM.sql");
my $data_test = $db->resultset("DataTest");

any 'query/:first/:last' => [format => ['json']] => sub{
   my $self = shift;
   my $jfilter = $self->req->content->get_body_chunk;
   app->log->debug("content: " .  $jfilter);
   my $filter = Mojo::JSON->decode($jfilter);
   app->log->debug(Dumper $filter);
   my @array;
   for my $line(($data_test->search($filter))[$self->stash->{first} .. $self->stash->{last}]) {
      next unless defined $line;
      push @array, {
                    '$FreeDOM::__UNIQUE_LINE_ID__' => $line->id,
                    'col1'                         => $line->col1,
                    'col2'                         => $line->col2,
                    'col3'                         => $line->col3,
                    'col4'                         => $line->col4,
                    'col5'                         => $line->col5,
                   };
   }
   app->log->debug(Dumper \@array);
   $self->render_json({lines => \@array, columns => [qw/col1 col2 col3 col4 col5/]});
};

any 'count' => sub{
   my $self = shift;
   my $jfilter = $self->req->content->get_body_chunk;
   app->log->debug("content: " .  $jfilter);
   my $filter = Mojo::JSON->decode($jfilter);
   app->log->debug(Dumper $filter);
   my $count = $data_test->search($filter)->count;
   app->log->debug("COUNT: $count");
   $self->render_json($count);
};


app->start;
